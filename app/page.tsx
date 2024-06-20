"use client"
import {useEffect, useState} from 'react';

const Home = () => {
    const [file, setFile] = useState<File | null>(null); // State for the selected file
    const [objectImages, setObjectImages] = useState<string[]>([]); // State for the list of uploaded images
    const [imageNames, setImageNames] = useState<string[]>([]); // State for image names in the public/upload directory

    // Function to handle file upload
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload file');
            }

            // Refresh the list of uploaded images after successful upload
            fetchUploadedImages();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // Function to fetch image names from the server
    const fetchImageNames = async () => {
        try {
            const res = await fetch('/api/getImageNames');
            if (res.ok) {
                const data = await res.json();
                setImageNames(data.imageNames);
            } else {
                throw new Error('Failed to fetch image names');
            }
        } catch (error) {
            console.error('Error fetching image names:', error);
        }
    };

    // useEffect hook to fetch image names on component mount
    useEffect(() => {
        fetchImageNames();
    }, []);

    // Function to fetch the list of uploaded images
    const fetchUploadedImages = async () => {
        try {
            const res = await fetch('/api/getUploadedImages');
            if (res.ok) {
                const data = await res.json();
                setObjectImages(data.images);
            } else {
                throw new Error('Failed to fetch uploaded images');
            }
        } catch (error) {
            console.error('Error fetching uploaded images:', error);
        }
    };

    // Function to handle file deletion

    // Function to handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };



    return (
        <div>
            <form onSubmit={onSubmit}>
                {/* File input for uploading */}
                <input type="file" name="file" onChange={handleFileChange}/>
                <input type="submit" value="Upload"/>
            </form>


        </div>
    );
};

export default Home;
