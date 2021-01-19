module.exports = {
	// set your styleguidist configuration here
	title: 'Ramphal Design Guide',
	components: 'src/components/**/[A-Z]*.vue',
	defaultExample: true,
	sections: [
		{
		name: 'All',
		components: 'src/components/**/[A-Z]*.vue',
		},
		{
	    name: 'Input',
	    components: 'src/components/MyButton.vue',
	  	},
		{
		  name: 'Image Cards',
		  components: 'src/components/WorkPlay.vue',
		}
	  ],
	// webpackConfig: {
	//   // custom config goes here
	// },
	exampleMode: 'expand'
}
