import React, {useState, useEffect} from 'react';
// import {Uploader} from "uploader"; // Installed by "react-uploader".
// import { UploadButton } from "react-uploader";
import {UploadButton} from "@bytescale/upload-widget-react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
function Favicon() {
    const options = {
        apiKey: "public_W142iHiDs9CJ7cNwZqk9nYJvUqkj", // This is your API key.
        maxFileCount: 1,
        showFinishButton: true,
    };
    const [favicon, setFavicon] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    // const handleFaviconUpload = (e) => {
    //     const uploadedFavicon = e.target.files[0];
    //     setFavicon(uploadedFavicon);
    // };
    const isValidImageType = (file) => {
        if (file && file.name) {
            const allowedExtensions = [".ico", ".png", ".jpg", ".jpeg", ".svg"];
            const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            return allowedExtensions.includes(extension);
        }
        return false;
    };



    const onCompleteCallback = (files) => {
        const uploadedFile = files[0];
        if (uploadedFile && isValidImageType(uploadedFile)) {
            const uploadedFavicon = uploadedFile.fileUrl;
            setFavicon(uploadedFavicon);
            setUploadError(null);
        } else {
            setUploadError("Invalid image format. Please upload a valid image.");
            setFavicon(null);
        }
    };

    useEffect(() => {
        if (favicon) {
            // Create a new link element for the favicon
            const link = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = favicon; // Use the uploaded favicon

            // Find the existing favicon link element in the head (if any)
            const existingFavicon = document.querySelector("link[rel='shortcut icon']");

            // If an existing favicon link is found, remove it
            if (existingFavicon) {
                document.head.removeChild(existingFavicon);
            }

            // Append the new link element to the head to set the favicon
            document.head.appendChild(link);
        }
    }, [favicon]);


    return (
        <>
            <div className="input-container">
                <UploadButton options={options}
                              onComplete={onCompleteCallback}
                              accept=".ico, .png, .jpg, .jpeg, .svg"

                >
                    {/*onChange={handleFaviconUpload}*/}
                    {({onClick}) =>
                        <button onClick={onClick}>
                            Upload a file...
                        </button>
                    }
                </UploadButton>
                {uploadError && <div className="error">{uploadError}</div>}
            </div>
        </>
    );
}

export default Favicon;
