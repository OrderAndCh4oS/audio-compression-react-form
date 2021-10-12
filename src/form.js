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

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(fileType && fileContents) {
                const filePath = await uploadToS3({fileType, fileContents});
                console.log('filePath is', filePath);
                fileDispatch({type: 'RESET_FILE_STATE'});
            }
        } catch(err) {
            console.log('error is', err);
        }
    };
    return (
        <>
            <h1>Upload to S3</h1>
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
