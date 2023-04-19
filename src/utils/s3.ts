import aws from 'aws-sdk'

const region = "us-east-1"
const secretAccessKey = "4AZMKTe+Or1pqCeZagvf3pH1Wl3kj5x4KkU7frHx"
const accessKeyId = "AKIA4OLUM7OFEWIKLPXP"
const bucketName = "ass5bucket"

console.log(region)
console.log(secretAccessKey)
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

// generate uploadUrl using random 16 bytes filename (resolve filename collision in the s3)
const generateUploadUrl: (name: string) => Promise<any> = async (name: string) => {
    // const rawBytes = await randomBytes(16)
    // const imageName = rawBytes.toString('hex')
    const params = ({
        Bucket: bucketName,
        Key: name,
        Expires: 60
    })
    let res;
    try {
        res = await s3.getSignedUrlPromise('putObject', params)
        console.log(res)
        return res;
    } catch (e) {
        console.log(e)
        return e
    }
}

export default generateUploadUrl
