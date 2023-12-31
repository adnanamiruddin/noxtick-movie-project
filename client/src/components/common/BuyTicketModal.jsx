import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import userTicketApi from "../../api/modules/user.ticket.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bookedSeatsApi from "../../api/modules/booked.seats.api";
import { bookTickets } from "../../redux/features/userSlice";
import uiConfigs from "../../configs/ui.configs";
import DateRangeIcon from "@mui/icons-material/DateRange";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import EscalatorWarningOutlinedIcon from "@mui/icons-material/EscalatorWarningOutlined";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import userApi from "../../api/modules/user.api";

const BuyTicketModal = ({
  open,
  onClose,
  movie,
  selectedDate,
  selectedTime,
  selectedSeats,
}) => {
  const { user, listTickets } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onRequest, setOnRequest] = useState(false);
  const [balance, setBalance] = useState(0);

  const currentTime = new Date();
  const total = selectedSeats.length * movie.ticket_price;

  useEffect(() => {
    const getUserInfo = async () => {
      dispatch(setGlobalLoading(true));
      const { response } = await userApi.getInfo();
      dispatch(setGlobalLoading(false));

      if (response) setBalance(response.balance);
    };

    getUserInfo();
  }, [user, listTickets, dispatch]);

  const handleConfirmBuy = async () => {
    if (onRequest) return;

    setOnRequest(true);
    const body = {
      showtimeDate: selectedDate,
      showtimeTime: selectedTime,
      seatNumbers: selectedSeats,
      movieAgeRating: movie.age_rating,
      movieTicketPrice: movie.ticket_price,
      movieTitle: movie.title,
      moviePoster: movie.poster_url,
    };
    const { response, error } = await userTicketApi.bookTickets(body);

    if (response) {
      const body = {
        showtimeDate: selectedDate,
        showtimeTime: selectedTime,
        seatNumbers: selectedSeats,
        movieId: movie.id,
        movieTitle: movie.title,
      };
      const { response, error } = await bookedSeatsApi.addBookedSeats(body);

      if (response) {
        dispatch(bookTickets(response));
        toast.success("Successful purchase of tickets");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
      if (error) toast.error(error.message);
    }
    if (error) toast.error(error.message);
    setOnRequest(false);
  };

  return user ? (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.paper",
          boxShadow: 24,
          padding: 4,
          paddingTop: 2,
          maxWidth: 600,
          borderRadius: "1rem",
          width: { xs: "75%", sm: "65%", md: "50%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo />
        </Box>

        <Typography
          variant="h5"
          fontWeight="800"
          sx={{
            marginTop: 1,
            marginBottom: 3,
            ...uiConfigs.style.typoLines(3, "center"),
          }}
        >
          {movie.title} ({movie.age_rating}+)
        </Typography>

        {user.age > movie.age_rating ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "start",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 4, sm: 0 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <DateRangeIcon />
                  {selectedDate + " " + currentTime.getFullYear()}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <WatchLaterOutlinedIcon /> {selectedTime}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    maxWidth: { xs: "100%", sm: "90%", md: "100%" },
                  }}
                >
                  <WeekendOutlinedIcon /> [ {selectedSeats.join(", ")} ]
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: { xs: "start", sm: "end" },
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: { xs: "row", sm: "row-reverse" },
                  }}
                >
                  <AttachMoneyOutlinedIcon /> Balance Rp.{balance}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: { xs: "row", sm: "row-reverse" },
                  }}
                >
                  <PointOfSaleOutlinedIcon /> Total Rp.{total}
                </Typography>

                <Box
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexDirection: { xs: "row", sm: "row-reverse" },
                  }}
                >
                  <CurrencyExchangeOutlinedIcon />{" "}
                  {selectedSeats.length === 0 ? (
                    <Typography
                      variant="body1"
                      fontWeight="500"
                      sx={{
                        color: "orange",
                        textAlign: { xs: "start", sm: "end" },
                      }}
                    >
                      Please select your seat!
                    </Typography>
                  ) : (
                    ""
                  )}
                  {selectedSeats.length > 0 && balance <= total ? (
                    <Typography
                      variant="body1"
                      fontWeight="700"
                      sx={{
                        color: "red",
                        textAlign: { xs: "start", sm: "end" },
                        maxWidth: "85%",
                      }}
                    >
                      Not enough balance ({balance - total})
                    </Typography>
                  ) : selectedSeats.length > 0 && balance >= total ? (
                    <Typography
                      variant="body1"
                      fontWeight="700"
                      sx={{
                        color: "green",
                        textAlign: { xs: "start", sm: "end" },
                      }}
                    >
                      Change Rp.{balance - total}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="caption">
                Confirm your purchase, {user.displayName.split(" ")[0]}
              </Typography>
              <Button
                variant="contained"
                disabled={total !== 0 ? false : true}
                onClick={handleConfirmBuy}
                sx={{ width: "50%" }}
              >
                Buy
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              marginTop: 3.5,
            }}
          >
            <EscalatorWarningOutlinedIcon />
            <Typography variant="body1" fontWeight="500">
              Sorry but you are not old enough ({user.age}) to watch this movie
              :)
            </Typography>

            <Button
              variant="contained"
              disabled={total !== 0 ? false : true}
              color="error"
              onClick={() => onClose()}
              sx={{ width: "30%" }}
            >
              Back
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  ) : (
    ""
  );
};

export default BuyTicketModal;
