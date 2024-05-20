import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faFilePdf, faFile, faFileExcel, faFileWord, faCode, faFileVideo } from "@fortawesome/free-solid-svg-icons";

const getFileType = (file_name) => {
    return file_name.split(".")[1];
}

const isImage = (file_name) => {
    const image_type_arr = ["png", "jpeg", "jpg", 'gif', 'svg', 'webp', "tiff"]
    return(image_type_arr.includes(getFileType(file_name)))
}

const FileTitle = ({ caption, char_lim }) => {
    const doc_map = {
        "pdf": <FontAwesomeIcon icon={faFilePdf} className="text-red-500 lg:text-xl md:text-base" />,
        "doc": <FontAwesomeIcon icon={faFileWord} className='text-blue-500 lg:text-xl md:text-base' />,
        "docx": <FontAwesomeIcon icon={faFileWord} className='text-blue-500 lg:text-xl md:text-base' />,
        "xlsx": <FontAwesomeIcon icon={faFileExcel} className='text-green-500 lg:text-xl md:text-base' />,
        "csv": <FontAwesomeIcon icon={faFileExcel} className='text-green-500 lg:text-xl md:text-base' />,
        "exe": <FontAwesomeIcon icon={faCode} className='text-red-600 lg:text-xl md:text-base' />,
        "mp4": <FontAwesomeIcon icon={faFileVideo} className='text-red-600 lg:text-xl md:text-base' />,
        "avi": <FontAwesomeIcon icon={faFileVideo} className='text-red-600 lg:text-xl md:text-base' />,
        "default": <FontAwesomeIcon icon={faFile} className="text-slate-600 lg:text-xl md:text-base" />
    };

    const fileIcon = isImage(caption) ? <FontAwesomeIcon icon={faImage} className='text-red-600 lg:text-xl md:text-base' /> : doc_map[getFileType(caption)];
    const fileName = caption.length > char_lim ? (
        <span className='w-[100%] text-sm lg:text-base whitespace-nowrap'>{caption.slice(0, char_lim) + "..."}</span>
    ) : (
        <span className='w-[100%] text-sm lg:text-base whitespace-nowrap'>{caption}</span>
    );
    return (
        <>
            {fileIcon}
            {fileName}
        </>
    );
}

export default FileTitle;
