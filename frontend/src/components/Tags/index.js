import { useEffect } from 'react';

export default function Login(props) {
    const animalTags = {
        cachorro: "#5DADE2",
        gato: "#F1C40F",
        passaro: "#EC7063",
        roedor: "#EB984E",
        outros: "#CACFD2"
    }

    const typeTags = {
        ajuda: "#58D68D",
        oferta: "#A569BD"
    }

    useEffect(() => {
        var animalTagElement = document.querySelectorAll('.ATag');
        for (var i = 0; i < animalTagElement.length; i++)
            animalTagElement[i].style.backgroundColor = animalTags[animalTagElement[i].innerText];
        var typeTagElement = document.querySelectorAll('.TTag');
        for (var i = 0; i < typeTagElement.length; i++)
            typeTagElement[i].style.backgroundColor = typeTags[typeTagElement[i].innerText];
    }, []);

    return (
        <div>
            <p className='ATag'>{props.animalTag}</p>
            <p className='TTag'>{props.typeTag}</p>
        </div>
    );
}