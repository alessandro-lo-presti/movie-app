import { createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/error/NotFound";
import Login from "./components/guest/Login";
import Actors from "./components/restricted/actors/Actors";
import Header from "./components/restricted/header/Header";
import Home from "./components/restricted/home/Home";
import Ranking from "./components/restricted/ranking/Ranking";

function App() {
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );
  // const { token } = useSelector((state) => state.tokenSlice);
  const token = true;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {token ? (
          <>
            <Header></Header>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/ranking">
                <Ranking />
              </Route>
              <Route path="/actors">
                <Actors />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </>
        ) : (
          <Login token="123" />
        )}
      </ThemeProvider>
    </Router>
  );
}

export default App;
