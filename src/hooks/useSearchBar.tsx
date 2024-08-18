import { useState } from "react"

const useSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return {setSearchTerm, searchTerm}
}

export default useSearchBar