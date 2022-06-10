const demo:AuthRoute.Route={
name:'demo',
path:'/demo',
component:'basic',
children:[{
	name:'demo_data',
	path:'/demo/demoData',
	component:'self',
	meta:{
		title:'测试',
		requiresAuth:true,
		icon:'ic:baseline-block'
	}
}]
}
export default demo
