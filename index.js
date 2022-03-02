import React, { useRef, useState, useEffect } from 'react'

import { TextInput } from 'react-native'

function extractSerial(data) {

    if (!data) return ''

    return parseInt(data).toString(16).toUpperCase().match(/.{1,2}/g).reverse().join("")

}

const NFCTextInputScanner = ({ callback }) => {

    const inputRef = useRef()

    const [ tagInputText, setTagInputText ] = useState(() => '')

    const [ inputFocusInterval, setInputFocusInterval ] = useState(() => 0)

    useEffect(() => {

        setInputFocusInterval(setInterval(function () {
            if (inputRef.current) inputRef.current.focus()
        }, 3000))

        return () => clearInterval(inputFocusInterval)

    }, [])

    useEffect(() => {

        if (tagInputText.length >= 10) {
            callback(extractSerial(tagInputText))
            setTagInputText('')
        }

    }, [tagInputText])

    return (
        <TextInput value={tagInputText} onChangeText={setTagInputText} ref={input => inputRef.current = input} showSoftInputOnFocus={false} autoFocus={true} style={{ width: 0, height: 0, zIndex: -100, position: 'absolute', top: 0, left: 0 }}  />
    )

}

export default NFCTextInputScanner;
