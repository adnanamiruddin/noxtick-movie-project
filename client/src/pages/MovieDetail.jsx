import { useParams } from "react-router-dom";
import movieApi from "../api/modules/movie.api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import HeaderImage from "../components/common/HeaderImage";
import { Box, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import MovieSeats from "../components/common/MovieSeats";
import MovieSchedule from "../components/common/MovieSchedule";
import Container from "../components/common/Container";

const MovieDetail = () => {
  const { user, listTickets } = useSelector((state) => state.user);
  const { movieTitle } = useParams();

  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMovieDetails = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await movieApi.getMovieByTitle({
        title: movieTitle,
      });
      dispatch(setGlobalLoading(false));
      if (response) {
        setMovie(response);
      }
      if (error) toast.error(error.message);
    };

    getMovieDetails();
  }, [movieTitle, dispatch]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      // Menghapus kursi yang sudah dipilih dari selectedSeats
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      //  Menambahkan kursi yang belum dipilih ke selectedSeats
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  return movie ? (
    <div>
      {/* Movie's Background Image START */}
      <HeaderImage imgPath={movie.poster_url} />
      {/* Movie's Background Image END */}

      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Movie's Poster START */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "30%" },
                margin: { xs: "0 auto 2rem", md: "0 4rem 0 2rem" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "160%",
                  ...uiConfigs.style.backgroundImage(movie.poster_url),
                }}
              />
            </Box>
            {/* Movie's Poster END */}

            {/* Movie's Information START */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
                marginTop: { xs: 0, md: "10%" },
              }}
            >
              <Stack spacing={5}>
                {/* Movie's Title START */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", lg: "3.5rem" }}
                  fontWeight="700"
                  textTransform="uppercase"
                  sx={{
                    ...uiConfigs.style.typoLines(2, {
                      xs: "center",
                      md: "left",
                    }),
                  }}
                >{`${movie.title} (${
                  movie.release_date.split("-")[0]
                })`}</Typography>
                {/* Movie's Title END */}

                {/* Movie's Overview/Description START  */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {movie.description}
                </Typography>
                {/* Movie's Overview/Description END  */}

                {/* Movie's Age Rating START */}
                <Box
                  sx={{
                    backgroundColor:
                      movie.age_rating <= 11
                        ? "success.main"
                        : movie.age_rating > 11 && movie.age_rating <= 13
                        ? "info.main"
                        : "error.main",
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    width: "max-content",
                    "&:hover": {
                      cursor: "pointer",
                      "&::after": {
                        content: "'Age Rating'",
                        display: "block",
                        position: "absolute",
                        transform: "translateX(-50%)",
                        backgroundColor: "#fff",
                        color: "#000",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                      },
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="700"
                    sx={{ fontSize: "1.5rem", ...uiConfigs.style.typoLines(1) }}
                  >
                    {movie.age_rating}+
                  </Typography>
                </Box>
                {/* Movie's Age Rating END */}
              </Stack>
            </Box>
            {/* Movie's Information END */}
          </Box>
        </Box>

        <Box sx={{ marginTop: "4rem" }}>
          <Container header="Movie Schedule">
            <MovieSchedule
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </Container>
          <Container header="Movie Seats">
            <MovieSeats
              selectedSeats={selectedSeats}
              handleSeatClick={handleSeatClick}
            />
          </Container>
        </Box>
      </Box>
    </div>
  ) : null;
};

export default MovieDetail;
