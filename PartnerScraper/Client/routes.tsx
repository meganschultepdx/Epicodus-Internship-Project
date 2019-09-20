import * as React from "react";
import { Route, Switch } from "react-router";
import Details from "./src/pages/Details/Details";
import DataDump from "./src/pages/DataDump/DataDump"

export const routes = ( 
    <div>
        <Switch>
            <Route exact path="/dataset" component={DataDump} />
            <Route path="/upc/" component={Details} />
        </Switch>
    </div>
)
