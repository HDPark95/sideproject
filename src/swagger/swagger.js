const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "몽고디비 node js",
            description:
                "프로젝트 설명 Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
        },
        servers: [
            {
                url: "http://localhost:3000", // 요청 URL
                url: "http://112.216.117.126:5032", // 요청 URL
            },
        ],
    },
    apis: ["./src/routers/*.js", "../routers/user/*.js"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }
