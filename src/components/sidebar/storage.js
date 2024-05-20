import React, { useState, useEffect } from 'react'
import { db } from "../../firebaseinit"

const Storage = ({folder_name}) => {
    const [files, setFiles] = useState([])
    const [storageUsed, setStorageUsed] = useState(0)

    useEffect(() => {
        const unsubscribe = db.collection(folder_name).onSnapshot(snapshot => {
            const fetchedFiles = snapshot.docs.map(docs => ({
                ...docs.data()
            }))
            setFiles(fetchedFiles)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        setStorageUsed(calculateStorageUsed(files))
    }, [files])

    const calculateStorageUsed = (files) => {
        let totalBytes = 0
        files.forEach(file => {
            totalBytes += file.size
        })
        return totalBytes
    }

    const formatBytes = (bytes) => {
        const sizes = ["Bytes", "kB", "MB", "GB"]
        let sizeIndex = 0
        while (bytes > 1024 && sizeIndex < sizes.length - 1) {
            bytes /= 1024
            sizeIndex++
        }
        return `${bytes.toFixed(2)} ${sizes[sizeIndex]}`
    }

    const calculateProgressBarWidth = (storageUsed, totalCapacity) => {
        const percentage = (storageUsed / totalCapacity) * 100
        return `${percentage}%`
    }

    return (
        <div>
            <div className='bg-gray-300 mt-5 h-2 rounded-full'>
                <div className='bg-blue-500 h-2 rounded-full' style={{ width: calculateProgressBarWidth(storageUsed, 1073741824) }}>
                </div>
            </div>
            <p className='text-center mt-2 text-gray-700 font-medium'>{formatBytes(storageUsed)} of 1 GB used</p>
        </div>
    )
}

export default Storage
