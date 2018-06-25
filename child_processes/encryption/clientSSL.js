const fs = require('fs')
const request = require('superagent')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

function main() {
    return new Promise((resolve, reject) => {
        request.get('https://localhost:8000')
            // .key(fs.readFileSync('client-key.pem'))
            //   .cert(fs.readFileSync('client-cert.pem'))
            .key(fs.readFileSync('client-key.pem'))
            .cert(fs.readFileSync('client-cert.pem'))

            .end((err, res) => {
                if (err) {
                    console.log(`Error: ${err.name}-${err.message}`)
                    return reject(err)
                }
                console.log(`Resolve: ${res.text}`)
                return resolve(res.text)
            })
    })
}

main().then(() => {
    console.log('done')
})