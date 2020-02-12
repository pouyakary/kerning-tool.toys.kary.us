
//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    window.onload = ( ) => {
        const letters =
            loadLetters( )

        loadSideBarLetters( letters )
        onLetterPush( letters, "P" )

        document.getElementById( "copy-button" ).onclick =
            ( ) => onCopy( )
    }

//
// ─── LOAD CHARACTERS ────────────────────────────────────────────────────────────
//

    function loadLetters ( ) {
        return fontLetters.split( "" ).filter( x => ! /\s+/.test( x ) )
    }

    function createHTMLForCharacterBox ( char, letters ) {
        const element =
            document.createElement( "div" )
        element.classList.add( "char-box" )
        element.innerText =
            char
        element.onclick = ( ) =>
            onLetterPush( letters, char )
        return element
    }

    function loadSideBarLetters ( letters ) {
        const container =
            document.getElementById ( "chars-sidebar" )

        for ( const letter of letters ) {
            container.appendChild( createHTMLForCharacterBox( letter, letters ) )
        }
    }

//
// ─── GENERATE TEMPLATE ──────────────────────────────────────────────────────────
//

    function onLetterPush ( letters, char ) {
        const text =
            generateTemplateFor( letters, char )
        document.getElementById( "template" ).innerText =
            text
        document.getElementById( "copy-element" ).value =
            text
        console.log( text )
    }

    function generateTemplateFor ( letters, char ) {
        let text =
            ""
        for ( const letter of letters ) {
            text += letter + letter + char + letter + letter + " "
        }

        for ( const template of specialTemplatesFor( char ) ) {
            text += template + " "
        }

        return text
    }

//
// ─── COPY ───────────────────────────────────────────────────────────────────────
//

    function onCopy ( ) {
        const element =
            document.getElementById( "copy-element" )
        element.hidden = false
        element.select()
        element.setSelectionRange( 0, 99999 )

        try {
            document.execCommand( "copy" )
            window.getSelection( ).empty( )
            document.selection.empty( )
        } catch ( e ) { }

        element.hidden = true
    }

//
// ─── OTHER TEMPLATES ────────────────────────────────────────────────────────────
//

    function specialTemplatesFor ( char ) {
        return [
            `${ char }(${ char },${ char })${ char }`,
            `${ char }{${ char },${ char }}${ char }`,
            `${ char }[${ char },${ char }]${ char }`,
        ]
    }

// ────────────────────────────────────────────────────────────────────────────────
