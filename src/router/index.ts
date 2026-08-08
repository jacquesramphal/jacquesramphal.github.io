import { createRouter, createWebHistory } from 'vue-router';

// The landing route and the 404 fallback stay eager so the first paint and any
// unmatched URL resolve without a second network round-trip. Every other page
// is lazy-loaded: webpack emits each as its own chunk that only downloads when
// the route is visited, keeping the initial bundle small.
import HomePage from '@/pages/HomePage.vue';
import NotFound from '@/pages/misc/NotFound.vue';

const TheLogin = () => import('@/components/TheLogin.vue');
const Explorations = () => import('@/pages/Explorations.vue');
const DesignSystem = () => import('@/pages/DesignSystem.vue');
const MaintenancePage = () => import('@/pages/misc/MaintenancePage.vue');
const MyResume = () => import('@/pages/MyResume.vue');
const ProjectPage = () => import('@/pages/ProjectPage.vue');
const ProductPage = () => import('@/pages/ProductPage.vue');
const MarkdownPage = () => import('@/pages/MarkdownPage.vue');
const MyLibrary = () => import('@/pages/MyLibrary.vue');
const WritingIndex = () => import('@/pages/WritingIndex.vue');
const WorkIndex = () => import('@/pages/WorkIndex.vue');
const PlayIndex = () => import('@/pages/PlayIndex.vue');
const UsefulLinks = () => import('@/pages/UsefulLinks.vue');
const CoursePage = () => import('@/pages/CoursePage.vue');
const HirePage = () => import('@/pages/HirePage.vue');
const SessionReader = () => import('@/pages/SessionReader.vue');
const BusinessCardPage = () => import('@/pages/BusinessCardPage.vue');
const SubscribedPage = () => import('@/pages/SubscribedPage.vue');
const FullscreenMenu = () => import('../components/FullscreenMenu.vue');
import { getDocRecordById } from '@/utils/docRegistry';
import { getCourseBySlug, getDefaultCourse } from '@/utils/courseRegistry';
import { canViewLockedCourse } from '@/utils/courseAccess';

// Guard a course hub: locked courses require the access secret (see
// utils/courseAccess). Unlocked visitors are sent to NotFound so the course
// stays hidden.
const guardCourse = (to: any) => {
  const course = to.params?.slug ? getCourseBySlug(to.params.slug) : getDefaultCourse();
  if (course && course.locked && !canViewLockedCourse(to.query)) {
    return { name: 'NotFound' };
  }
  return true;
};

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      hidePageWrapper: true,
      hideFooter: true,
    },
  },
  {
    path: '/brb',
    name: 'MaintenancePage',
    component: MaintenancePage,
    meta: {
      hideNav: true,
      hideFooter: true,
      hidePageWrapper: true,
    },
  },
  {
    path: '/menu',
    component: FullscreenMenu,
    beforeEnter: (to, from, next) => {
      // Delay the rendering of the component for a brief moment
      setTimeout(() => {
        next();
      }, 10);
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: TheLogin,
  },
  {
    path: '/',
    name: 'Jacques Ramphal',
    component: HomePage,
    children: [],
    meta: {
      hideNav: false,
    },
  },

  {
    path: '/hire',
    name: 'Hire',
    component: HirePage,
    meta: {
      title: 'Jacques Ramphal — Design Engineer',
    },
  },

  {
    path: '/links',
    name: 'Links',
    component: UsefulLinks,
  },
  {
    path: '/resume',
    name: 'Resume',
    component: MyResume,
    meta: {
      hideFooter: true,
    },
  },
  {
    path: '/info',
    redirect: { name: 'Doc', params: { slug: 'info' } },
  },
  {
    path: '/about',
    redirect: { name: 'Doc', params: { slug: 'info' } },
  },
  {
    path: '/doc/about-this-site',
    redirect: '/about',
  },

  {
    path: '/designsystem',
    name: 'Design System',
    component: DesignSystem,
  },
  {
    name: 'Library',
    path: '/library',
    component: MyLibrary,
  },
  {
    name: 'WritingIndex',
    path: '/writing',
    component: WritingIndex,
  },
  {
    name: 'WorkIndex',
    path: '/work',
    component: WorkIndex,
  },
  {
    name: 'PlayIndex',
    path: '/play',
    component: PlayIndex,
  },
  {
    name: 'Explorations',
    path: '/explorations',
    component: Explorations,
    meta: {
      title: 'Explorations',
    },
  },
  {
    name: 'Product',
    path: '/product',
    component: ProductPage,
  },
  {
    name: 'Work',
    path: '/work/:id',
    component: ProjectPage,
    props: true,
    meta: {
      dynamicTitle: true,
    },
  },
  {
    name: 'DocById',
    path: '/doc/:id(\\d+)',
    component: MarkdownPage,
    props: true,
    meta: {
      dynamicTitle: true,
    },
    beforeEnter: (to) => {
      const raw = to.params?.id;
      const id = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
      if (!Number.isFinite(id)) return true;

      const record = getDocRecordById(id);
      if (record?.slug) {
        return { name: 'Doc', params: { slug: record.slug } };
      }
      return true;
    },
  },
  {
    name: 'Doc',
    path: '/doc/:slug',
    component: MarkdownPage,
    props: true,
    meta: {
      dynamicTitle: true,
    },
  },
  {
    name: 'SecuredDoc',
    path: '/secured/doc/:slug',
    component: MarkdownPage,
    props: true,
    meta: {
      dynamicTitle: true,
    },
  },
  // {
  //   name: "Doc",
  //   path: "/doc/:id",
  //   component: DocPage,
  // },
  // {
  //   name: "Docs",
  //   path: "/docs",
  //   component: MyDocs,
  // },

  {
    name: 'Course',
    path: '/Course',
    component: CoursePage,
    beforeEnter: guardCourse,
  },
  {
    name: 'CourseBySlug',
    path: '/course/:slug',
    component: CoursePage,
    props: true,
    beforeEnter: guardCourse,
    meta: {
      dynamicTitle: true,
    },
  },
  {
    name: 'Session',
    path: '/session/:slug',
    component: SessionReader,
    props: true,
    meta: {
      hideFooter: true,
      hideChat: true,
      dynamicTitle: true,
    },
  },
  {
    name: 'Subscribed',
    path: '/subscribed',
    component: SubscribedPage,
    meta: {
      title: 'Subscribed',
    },
  },
  {
    name: 'BusinessCard',
    path: '/card',
    component: BusinessCardPage,
    meta: {
      hideFooter: true,
      hideNav: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Determine if maintenance mode is enabled by default
  const maintenanceMode = false; // Set this to true to enable maintenance mode (bypass: ?bypass=secret)

  // Check if the application is running on localhost or local network IP
  const hostname = window.location.hostname;
  const isLocalhost =
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '192.168.2.204';

  // Check for bypass query parameter or stored bypass
  const bypassParam = to.query.bypass === 'secret';
  const bypassStored = localStorage.getItem('maintenanceBypass') === 'true';

  // Store bypass in localStorage if query param is present
  if (bypassParam && !bypassStored) {
    localStorage.setItem('maintenanceBypass', 'true');
  }

  const canBypass = isLocalhost || bypassParam || bypassStored;

  if (canBypass) {
    // Allow access
    next();
  } else if (maintenanceMode && to.name !== 'MaintenancePage') {
    // If maintenance mode is enabled and not on the maintenance page, redirect to maintenance page
    next({ name: 'MaintenancePage' });
  } else {
    // Allow navigation
    next(); // This line allows the navigation to proceed
  }
});

export default router;
