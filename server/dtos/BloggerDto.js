module.exports = class BloggerDto {
    constructor(model) {
        this.id = model.blogger.id
        this.name = model.blogger.name
        this.surname = model.blogger.surname
        this.about = model.blogger.about
        this.rating = model.rating
        this.cases = model.cases.map(case_ => new CaseDto(case_))
        this.tags = model.tags.map(tag => tag.tagName)
        this.platforms = model.platforms.map(platform => new PlatformDto(platform))
    }
}

class CaseDto {
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.date = model.date
    }
}

class PlatformDto {
    constructor(model) {
        this.name = model.platformName
        this.subscribers = model.subscribers
    }
}