import { useContext } from "react"
import { Row, Spinner } from "react-bootstrap"
import { AppContext } from "../../context"
import { IContextValues } from "../../types"

const CenterLoader = () => {
    const { theme } = useContext(AppContext) as IContextValues

    return (
        <Row className="justify-content-center p-5">
            <Spinner animation="border" variant={theme === "dark" ? "light" : "dark"} />
        </Row>
    )
}

export default CenterLoader