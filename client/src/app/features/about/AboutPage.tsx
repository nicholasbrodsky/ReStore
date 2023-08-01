// import { Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../api/agent";
import { AxiosResponse } from "axios";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    function clickValidationError() {
        agent.TestErrors.getValidationError()
            .catch((error) => {
                console.log(error)

                setValidationErrors(error)
            })
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'normal', textTransform: 'uppercase', }}>Errors for testing purposes</h1>
            <div className="row" style={{ marginTop: 24 }}>
                <button onClick={agent.TestErrors.get400Error} className="btn btn-primary col">Test 400 Error</button>
                <button onClick={agent.TestErrors.get401Error} className="btn btn-primary col">Test 401 Error</button>
                <button onClick={() => agent.TestErrors.get404Error().catch((error: AxiosResponse) => setValidationErrors([]))} className="btn btn-primary col">Test 404 Error</button>
                <button onClick={agent.TestErrors.get500Error} className="btn btn-primary col">Test 500 Error</button>
                <button onClick={clickValidationError} className="btn btn-primary col">Test Validation Error</button>
            </div>

            {validationErrors.length > 0 &&
                
                <div className="row" style={{ marginTop: 24 }}>
                    {validationErrors.map((error, index) => (
                        <h4 key={index}>{error}</h4>
                    ))}
                </div>}
        </div>
    )
}
