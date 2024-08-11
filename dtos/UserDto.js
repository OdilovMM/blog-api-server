

module.exports = class UserDto {
   

    constructor(model) {
        this.id = model._id
        this.name = model.name
        this.mobile = model.mobile
        this.isVerified = model.isVerified
    }

}