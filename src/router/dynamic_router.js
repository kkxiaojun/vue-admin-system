const Side = () => import('@/views/side/side')
const User = () => import('@/views/user/user')

/* 需要权限判断的路由 */
const DynamicRouters = [
    {
        path: '/orderManage',
        meta: {
            name: '订单管理',
            icon: 'icon-email'
        },
        children: [
            {
                name: 'order',
                path: '/order',
                component: Side,
                meta: {
                    name: '订单列表'
                }
            }
        ]
    },
    {
        path: '/system',
        meta: {
            name: '系统管理',
            icon: 'icon-user'
        },
        children: [
            {
                name: 'system',
                path: '/system',
                component: User,
                meta: {
                    name: '用户管理'
                }
            }
        ]
    }
]

export default DynamicRouters