import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import {useState} from "react";
import generateUploadUrl from "../utils/s3";


const Uploader = () => {
    const [status, setStatus] = useState("")

    const getUploadParams: IDropzoneProps['getUploadParams'] = async (file) => {
        console.log(file.meta.id)
        const url: URL = await generateUploadUrl(file.meta.id)
        console.log("url generated: ", url)
        await fetch(url,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file.file
            })
        return {url: 'https://httpbin.org/post'}
    }

    const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta, remove }, status) => {
        console.log(status, meta)
        setStatus(status)
        if (status === 'headers_received') {
            window.alert(`${meta.name} uploaded!`)
            remove()
        } else if (status === 'aborted') {
            window.alert(`${meta.name}, upload failed...`)
        }
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            accept=".png"
            maxFiles={1}
            multiple={false}
            canCancel={false}
            inputContent="Drop A Image File"
            styles={{
                dropzone: { width: 400, height: 200 },
                dropzoneActive: { borderColor: 'green' },
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
            }}
        />
    )
}

export default Uploader