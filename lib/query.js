const connectDb = require('./db')
const { ObjectId } = require('mongodb')
const errorH = require('./errorHandler')


module.exports = {
    getCourses: async () => {
        let db 
        let courses = []
        try {
            db = await connectDb(process.env.MONGO_URI)
            courses = await db.collection('courses').find().toArray()
        } catch(error) {
            errorH.errorHandler(error)
        }
        return courses
    },
    getCourse: async (root, {id}) => {
        let db 
        let course
        try {
            db = await connectDb(process.env.MONGO_URI)
            course = await db.collection('courses').findOne({_id: ObjectId(id)})
        } catch(error) {
            errorH.errorHandler(error)
        }
        return course
    },
    getPeople: async () => {
        let db 
        let students = []
        try {
            db = await connectDb(process.env.MONGO_URI)
            students = await db.collection('students').find().toArray()    
        } catch(error) {
            errorH.errorHandler(error)
        }
        return students
    },
    getPerson: async (root, {id}) => {
        let db 
        let student
        try {
            db = await connectDb(process.env.MONGO_URI)
            course = await db.collection('students').findOne({_id: ObjectId(id)})
        } catch(error) {
            errorH.errorHandler(error)
        }
        return student
    },
    searchItems: async (root, {keyword}) => {
        let db 
        let items
        let courses
        let people
        try {
            db = await connectDb(process.env.MONGO_URI)
            courses = await db.collection('courses').find(
                {$text: {$search: keyword}}
            ).toArray()
            people = await db.collection('students').find(
                {$text: {$search: keyword}}
            ).toArray()
            items = [...courses, ...people]
        } catch(error) {
            errorH.errorHandler(error)
        }
        return items
    }
}