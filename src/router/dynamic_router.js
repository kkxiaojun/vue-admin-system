const Side = import('views/side/side')

/* 需要权限判断的路由 */
const DynamicRouters = [
    {
        path: '/side',
        component: Side,
        name: 'side',
        meta: {
            name: '订单管理',
            icon: 'icon-email'
        },
    },
]

export default DynamicRouters