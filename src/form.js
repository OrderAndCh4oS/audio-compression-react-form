import {uploadToS3} from './utilities/upload-file';
import {useFileChange} from './hooks/use-file-change';

const Form = () => {
    const {
        fileError,
        fileName,
        fileContents,
        fileType,
        fileDispatch,
        handleFileChange
    } = useFileChange();
    // const [s3FileUrl, setS3FileUrl] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('HERE');
        try {
            if(fileType && fileContents) {
                const filePath = await uploadToS3({fileType, fileContents});
                // setS3FileUrl(`${S3_BUCKET_URL}/${filePath}`);
                console.log('filePath is', filePath);
                fileDispatch({type: 'RESET_FILE_STATE'});
            }
        } catch(err) {
            console.log('error is', err);
        }
    };
    return (
        <>
            <h1>
                Upload files using the input below:
            </h1>
            {fileError && <h1>{fileError}</h1>}
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="picture">
                        {fileName || 'File Input'}
                        <input
                            type="file"
                            accept="image/*"
                            id="picture"
                            name="picture"
                            onChange={handleFileChange}
                        />
                    </label>
                </p>
                <p>
                    <button type="submit">Upload</button>
                </p>
            </form>
        </>
    );
};

export default Form;
