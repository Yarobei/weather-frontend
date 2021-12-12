import React, {useEffect, useState} from "react";
import {checkAuthorization} from "./service/auth/auth.service";
import Authorization from "./components/Authorization/Authorization";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    (async () => {
    const authResponse = await checkAuthorization();
    if (authResponse.status === 200) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }
    })()
  }, [])


  return (
    <>
    <Authorization isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
    </>
  )
}

export default App;
