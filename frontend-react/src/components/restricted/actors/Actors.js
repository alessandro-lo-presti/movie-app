import { useEffect, useState } from "react";
import { ApiService } from "../../../services/ApiServices";
import {
  actorsSelector,
  favouritesSelector,
  actorsSuccessAction,
  actorsErrorAction,
} from "../../../redux/slices/actorsSlice";
import { connect } from "react-redux";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import ActorCard from "../../../common/ActorCard";

const mapStateToProps = (state) => ({
  actors: actorsSelector(state),
  favourites: favouritesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  actorsSuccess: (actors, favourites) =>
    dispatch(actorsSuccessAction(actors, favourites)),
  actorsError: () => dispatch(actorsErrorAction()),
});

function Actors(props) {
  const { actors, favourites, actorsSuccess, actorsError } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    ApiService.waitActorsApi()
      .then((values) => {
        const result = {};
        values.forEach((value) =>
          value.user_id ? (result.favourites = value) : (result.actors = value)
        );
        return result;
      })
      .then((data) => {
        setLoading(false);
        actorsSuccess(data.actors, data.favourites);
      })
      .catch(() => {
        setLoading(false);
        actorsError();
      });
  }, [actorsSuccess, actorsError]);

  return (
    <Container maxWidth="md">
      <Grid container direction="row" justify="flex-start" alignItems="center">
        {!loading ? (
          actors.map((actor) => <ActorCard name={actor.name} />)
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Actors);