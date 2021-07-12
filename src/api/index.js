import request from '@/plugins/axios'


export function fetchItem() {
    return request({
        url: '/api/plan/planlist',
        method: 'post',
        data: {
            // "plan_name": "",
            // "username": "",
            // "created_at": ["", ""],
            // "remarks": "",
            // "page": 1
        }
    })
}