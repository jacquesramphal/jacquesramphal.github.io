// Small, dependency-free haptic helper.
//
// Web haptics are split across platforms:
//   • Android / Chrome expose the Vibration API (navigator.vibrate).
//   • iOS Safari has NO Vibration API at all. The only known way to produce a
//     haptic tick is to toggle a native "switch" control (the Cupertino toggle
//     you get from <input type="checkbox" switch>) — iOS accompanies that state
//     change with a subtle haptic. Crucially, the control must participate in
//     layout: display:none / visibility:hidden suppress the haptic. So we hide
//     it visually (opacity/size) while leaving it rendered.
//
// This replaces the `tactus` package, whose iOS fallback created the switch with
// display:none and therefore never fired on iPhone/iPad.

const HAPTIC_ID = "__haptic-switch__";
const DEFAULT_DURATION_MS = 10;

let switchInput: HTMLInputElement | null = null;
let switchLabel: HTMLLabelElement | null = null;

const isIOS = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
  // iPadOS 13+ reports as desktop Safari; detect it via touch points.
  const iPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return iOSDevice || iPadOS;
};

// Keep the element in the render tree but out of sight and out of the way.
// display:none and visibility:hidden both stop iOS from emitting the haptic.
const hideButRender = (el: HTMLElement) => {
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.left = "0";
  el.style.width = "1px";
  el.style.height = "1px";
  el.style.opacity = "0";
  el.style.pointerEvents = "none";
  el.style.zIndex = "-1";
};

const mountSwitch = () => {
  if (switchInput && switchLabel) return;
  if (typeof document === "undefined" || !document.body) return;

  switchInput = document.createElement("input");
  switchInput.type = "checkbox";
  switchInput.id = HAPTIC_ID;
  switchInput.setAttribute("switch", ""); // Safari-only native switch control
  switchInput.setAttribute("aria-hidden", "true");
  switchInput.tabIndex = -1;
  hideButRender(switchInput);

  switchLabel = document.createElement("label");
  switchLabel.htmlFor = HAPTIC_ID;
  switchLabel.setAttribute("aria-hidden", "true");
  hideButRender(switchLabel);

  document.body.appendChild(switchInput);
  document.body.appendChild(switchLabel);
};

/**
 * Fire a short haptic tick. No-op where haptics are unavailable (e.g. desktop).
 * Must be called from within a user gesture (a click/tap handler).
 */
export const triggerHaptic = (duration: number = DEFAULT_DURATION_MS): void => {
  if (typeof window === "undefined") return;

  if (isIOS()) {
    if (!switchInput || !switchLabel) mountSwitch();
    // Toggling the switch is what produces the haptic on iOS.
    switchLabel?.click();
    return;
  }

  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(duration);
  }
};
