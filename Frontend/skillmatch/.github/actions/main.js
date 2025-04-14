
const core = require('@actions/core') // Helps with inputs and outputs
const exec = require('@actions/exec') // Helps with with executing commands for uploading to S3


function run(){
    // Get inputs
    const bucket = core.getInput('bucket', { required: true })
    const bucketRegion = core.getInput('bucket-region', { required: true })
    const distFolder = core.getInput('dist-folder', { required: true })

    // Upload files to S3
    const s3URI = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${bucketRegion}`)
    // `aws s3 sync folder1 s3://skillmatchjoshmith --region us-east-1`


    // Get URI
    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
    // http://skillmatchjoshmith.s3-website.eu-north-1.amazonaws.com
    core. setOutput('website-url', websiteUrl)

}

run()
.catch((error) => {
    core.setFailed(error.message)
})