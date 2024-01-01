import PersonForm from "../../personComponents/PersonForm"

interface IParams {
    id: string
}


function ChangePerson({ params }: { params: IParams }) {


    return (
        <PersonForm
            personId={params.id}
        />
    )
}

export default ChangePerson