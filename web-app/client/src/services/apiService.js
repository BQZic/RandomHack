import Api from '@/services/api'

export default {
    registerUser(userId, location, firstName, lastName){
        return Api().post('registerUser', {
            userId: userId,
            location: location,
            firstName: firstName,
            lastName: lastName,
        })
    }
}