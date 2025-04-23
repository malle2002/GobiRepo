import Pagination from "../Pagination";

export default function ProfilePets({
    pets,
    pagination,
    setPage,
    setSelectedPet
}: {
    pets: Array<any>,
    pagination: {
        current_page: number,
        last_page: number,
    },
    setPage: (_:number) => void,
    setSelectedPet: (_:any | null) => void
}) {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">User's Pets</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets?.length > 0 ? (
                    pets.map((pet: any) => (
                        <li key={pet.id} className="p-4 shadow-lg rounded-lg bg-white cursor-pointer" onClick={() => setSelectedPet(pet)}>
                        <h3 className="text-lg font-semibold">{pet.name}</h3>
                        <p className="text-sm text-gray-600">{pet.breed}</p>
                        </li>
                    ))
                ) : (
                    <p>No pets found.</p>
                )}
            </ul>
            <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={setPage}
            />
        </div>
    )
}