import { useState, useEffect } from 'react';

import DoctorItem from './DoctorItem';
import AppointmentForm from '../Appointment/AppointmentForm';

import classes from './DoctorList.module.css';

// const DUMMY_DOCTORS = [
//   {
//     imageUrl:
//       'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000',
//     name: 'Ali Mahmoud',
//     speciality: 'Physical medicine and rehabilitation',
//     experience:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. At imperdiet dui accumsan sit amet nulla. Vivamus arcu felis bibendum ut tristique et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit.',
//   },
//   {
//     imageUrl:
//       'https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg',
//     name: 'Hatem Hossam',
//     speciality: 'Obstetrics and gynecology',
//     experience:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. At imperdiet dui accumsan sit amet nulla. Vivamus arcu felis bibendum ut tristique et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit.',
//   },
//   {
//     imageUrl:
//       'https://media.istockphoto.com/photos/happy-healthcare-practitioner-picture-id138205019?k=20&m=138205019&s=612x612&w=0&h=KpsSMVsplkOqTnAJmOye4y6DcciVYIBe5dYDgYXLVW4=',
//     name: 'Mahmoud Abdallah',
//     speciality: 'Family medicine',
//     experience:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. At imperdiet dui accumsan sit amet nulla. Vivamus arcu felis bibendum ut tristique et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit.',
//   },
//   {
//     imageUrl:
// 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVEhgWFBUSEhIYFRUcFRISEhESGRIVGBgaGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy80NTEBDAwMEA8QHhISHjQrISQ0NDQ0NDQ0NDU0NDQ0NDQ0NDQ0NDE0NDQ0MTQ0NDQ0NDQ0NDQxNDQ0NDQ0MTQ0NDQxNP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAgMHAQj/xABEEAACAQIEAwUFBAYJAwUAAAABAgADEQQFEiEGMUETIlFhgQcycZGhI0JSwRRygqKx0SQzYnOSssLh8EOD8RU0U2Oj/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQBAgMFBv/EACURAAICAgEDBAMBAAAAAAAAAAABAhEDIRIEMUEFIjJhE1Fxof/aAAwDAQACEQMRAD8A7LCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCYk23Ow6k9Jyvi7i58S5oYRyuGF1qVlNu2PIhDz0DxHO/hzhySVstGLk6Ra8749wWGJUu1aoL3p4cCoVI6M1woPkTfyleq+1lL9zCVGW/N6qIfkFYfWVOjk9PTubnxAt+ckUOHEPutb0/wCXmLzIZXSy8lyy/wBqWEdtNVK+HN7anVXX4koSR8pdcFjadZA9J0q0zydGDA+o6+U4pjuGSvJgw5WI5bc4rw9avgqvaYeoabfeUXKuBvZl5MOfP0lo5Uyk+nlHZ9EQlL4Q47p4silVXsMTbZCe5V8dBO9+uk7+F95dJqYNUEIQgQEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAEIQgBQvaRnBVVwqMUNRS1Zha4o30hB4FiD6KfGc+wlMXsBZRsAI245xBbMa/gpRF/VVFJ/eZ5Dyqnc2tFssu4908VobYWhtylhwOEum4t4SFgMNuAfrH1emUTY3v4TGPaxmT3RW8wWx+EUYrAq66mAP8RHeYKw5ggb9IpxT2W0r50XSTjsquKwpRwVJBUgqy7FWUggi3Ig7+k7XwVnn6ZhFdrdqpKVrbd9QDqt01KVa3S9uk4/jUuLnlfrLn7HmbVil+4P0cjn7xFQH6BflG8TZzs8Ujp0IQmwsEIQgAQhCABCEIAEIQgB5I+IxQQbzex2iDMVLG0rJ0i8I8nRsqZ4AZNweYK/WV6rlotz3mnAKyVLdJnHJbNZYUlaLtCasO11F5tmwuEIQgB7CEIAEIQgATEtYXMyijP8SUpnTztADDH5/TpmxImrBcS0nNtQnIc8pYmrUNiwW/S8XYdcRQYNqaw6GV5IvwZ9F0qgYXBvM5TuC82NVBc72jjiyo64DEtTJV1w9UqykgghCbgjcGTZWt0ck48umOrLyJqXv4BlVh9GETYfF1k76OGUc+ew63PITBXq4lQajvUf3VaodTBQBYMx3a1zubnkOkk4LKO8hYP3L3YMVNQXvZvLptbbaYTcb2OY4yrQ6yfiF6j6feIFyBebcZxHVViiOysOZI90eO884Uy5FxDuBcKCPnvbzty9IxxuWLVuoA1E776SfgwmHKKkM8ZONsV0sUWQvUr1H/7bhR8Wt+c0szEbEOvQg3/8za/CINRn0sjtYXRwqrZQuoDnqsL3vz3k85YaSWO/mTcnzJ8ZZuP7KxUv0IcT7ttxvyl89lmHWnQqMxUPVrHQCQGZEULe3M97X8pRcWQHF+Qvcc42yJBVq4aojsGWqv2aBkC95bqwPvG1ySfCXhKjKePnZ2SEIRoQCE8nsACEIQAIQhAAhCEANdQ7RNiue0dOLiLcQlpnk7G2KrE+KxBUGaMtq63hmjg3FpIyPC9ZhFe4anSjZZsOO6JtmKCwmUbOewhCEAPYQhAAhCEACLczpgg35RlI+LS6mQ+xMe5WHwtIDkLyv51hUZDYCPcxpEGK0w5ckGKSex+MfaZcD0CjW6S85lRL0KiAXLU3UDxLKRb6xRkWXaLGWKMxdrYlNJS0fOGU4iyr5k/UyyvilC3PLqQOQkfjnJf0bFsFI0VNVRQBbSruxK28iD6WizE5oEpqgCgsN3c2UeXx8phOFsdx5aix1w9xNh1D3sBvsx0tvext1jHLs4pVqgVFrioTsXpOqsOp1EWt8ZTcuy2g5ZmqprYEKwTUFvzPvCPqVTsNPZ4nV/eIbN49WPhKuEfBpHJKtouT4kK9nFgfdddg3xHjEOa4+7kA93pNGE4hNZWR1GoAFXW5RxvupMXV2JYynHeyylrRowxVqwDe6SQdtXPbl1l74YwanGFlUgKCzEi2+gKPXvXPxHnKzwnlP6RiGXUF0ozC66gSCBYjw3nUMmysUFNyGdiCzAWFhyAv0H5zaMG2n4Fp5VGLj5Y0hCeRkSCEJoxFbSJDdEpWbGqgQWoDENfFMTtMaONIO5mX5VZr+F1ZZISPh6txJE1TsyaoIQhJIPJCxYBmNXGiaO11QnBqNk45rlQlzOmBvJ+SYlALXkTM8K7bCLKdB6fXeL403KkhvJXC2y+q4PIzKVPCZoRsY5w+ZA847LDKJz1lixnCYI4YbTOZGh7CEIAEITFnAgBlMKnKRK+OCxTmGdWFhzk0wsxzZL3ibBvZ95tTMdd7+shYisA1xFJQblodjNKGy+4EjQLSVEGS5gCoF4+BvGUqQm3bOce1jBEilVA2syE+fvKPUavlOd4XSyMjBWN7gMARYfGd7znLExNB6L7Bhsw5qw3Vh8D+YnCs4yupg8Roq2DDYEG6uDupHxsZWSNscq0NcJn6UgFem9uhVAbHpYx+maLXUaUdB4OpB9bkys4TMaardwDYiwNud/5ywf8ArFF6YZCB49Iu7/Q6pfZEx9RFcW94Kd/7O23ztFiVL3M8xOKD1Do73d6b3uf9poZwpszAt0pp3j+0eQllHRk57L77NcKS9SrbuqoQH8TMQzfIBP8AFOgRBwThtGBp3FmbUx2t7zG37tpYJvFUhKbuTCeT2EsVPIlzirYRyTK9nT77+EzyPRpjXuFyYg2vI1NyXkiiQUvNCuA8VbHktFoy99hGYifLHuI3WNwehCapmUIQlyhVhNtOtaa2mpjOjxUlsQUmuwzOJW0T4yrc7TZaamSEMUYu0WnllJUyMEmD1Cu4M31OUW46ta/wmy2LvRZcjzHVYEyyCc0yTFaalvOdFw1TUgMQ6iHGWh3BPlE3whCLjAGLsdXtJ1RrCIcS+p7S0UQyPWQsZHqYAHeNVp7TBxLWVK7Wwem+mQnwTEyxOl552cEkWtifDI6Wte0s2W5ncWMgsgtFeOxi0QXNy1iQilQz26C5A9TtCVEIvfbLpLEgKASSTYADmTOL+1G74ha9j2Doio9rWK3IB8L3uPWWJzjHomriL09Y+ywiG6006M5++589gOQFzGeNypatBaVRQw7NFYHxCj85k1ZrHRw2qGAtqJHnvM0rm1rsfIXH1j7iThathe8A1TDH79rmn5P5eDcvHzx4Z4arYxwtFRoBGuo2yUx5nqfBRv6byrtaNVVXZpy+jUcaVuFJHdXqeQues6TwpwHa1TECy8xTPvN+v4Dy5/CWnh3hahhFGka6tt6rAXv10jko+vmY/MlR/ZSWTwhfmlOp2DjDsKdbT9kSoKh13VSD0NtJ8jtFPCPFlPGrpNqeKUHtKO45HSXS/Nb9OYvv0JcZzmC4eg9V/dpqW+JHuqPMmw9ZxSngauFpYXNNTBnxLFl5A0jcg/thano4lzNHep5MVYEX6HlPKj2F5BB5UMrfES9zUOk25hnyIbXEr2Oz9XBF9plLZrDQZO7EkHkZvzFSu8UUM3RDe8j5jn6uOcxlBvsMxypdy3ZBjb7S1I4InH8pzzQ3OPX4wC9ZrjtaYvkpu0dHhKTS4tUgbwmxlQxqCRmMkuNpHcTpI5rMknlQT1JjVMnyHggYt7CVzFYm72jnMW2lVrv9pGIIwnLYxoOVZT5zpWRVdVMfCc2SndQfhL9w03cAi3Vx9tm/Sy91FhhPLwvOadE1Yo9wytUal6lvOWLGnun4SrYcfaestEqx+67SLVG0kudpEr8pJJoC7zZTw7Me6L+fQes3YHDFu8dl/wAx8BGGLrpRpM7EKiKWaw5AeA6nwHUmQ2QkV7P8XTwdHXU+0qNcU6QuAzC27W30i4v8QBckA1Xg/JHxmLOKxA1IjG1wAHqLsEVRtpXe9tr7C/eJ14alVzTGF2JSnsSR/wBGiCQqqfxHvAHxLvy0gdSwODSjTWnTUIigKqjkAOUhsv2I+YYbXbla9zfy5W9bfKKM8zWjhKXaVdTNbuU0F2cjw8B4sdhLBVUk2HzPL/eVDjHIqK4atXcu9UITrd2AUAe6qjuhfKTGrIsotPizHYmoWVkpUlO1JFutvBid39fkJYsm44/RyKeICNSv/WUqao1O/Uogsy/AX/WlB7dqdNKa+8y6nPm29pa+E+CmxHfq6lo/itZqh8FPRfE+g8Q/LHjjD3IVUpSlpnXMNiUqIroyujAFXUhgwPUETdKrgMkfCMi4Rr0i47VajFgB95gOjW8PLpDjXOmpIuHo3OJr91QpswVjpuD0Zj3Qem5+7Oe0NCXiCo2Z4xcHSJGFpMGxFRT71jYgH5qvnqP3RJHtVoquWKigKq1aSqoFgoCsAB5WFpYuGMjTCUAgsajd6q4Ftb26eAA2A8BEftXS+AHlXT6q4/OBPkt2CB7JL89C/wCUTOpRDAg9Z5hGvTQjqi/wE3yCDn3EfB9csXoP2g/+NiEYfA8m+kpFegyMVdXRxzVwVI9DO7yFmGW0q66aqK46XG6+asNwfhAlM4dUkZhLvxTwY1FTUoaqlIXLId3QeIt7y/UefMUq0CbNJWYs03sJGqiQSZdqfGEjWPgYQA7mB3RI9SSmEjOJ0onNZik01jNt5HrmXRV9hRmDbSpY1rVJacadzET0AzfAiMR0haW2Nss3SWrKcWEW5MruGoaEHwkbE4huQmHUbg2MdPqaQ7zrjNaZteRso43DuFvES8PmtdmnicM9mwYbEGcVzO0sR0qrjg9O48JX8LWvU9ZngntTt5SHgn+1Pxm8GnEXlFxZa2bYQpU9bAdOvwmh25Sfl45ny/8AH5/ODKomBQLKNgBy/hOde0DM2rVUwVMF7aXrKpsXdjajSB6EnveXdb7svOb5imHo1K9Q9ymlzbmxHJR5kkAeZlF4AwDVq9XF1hd9bW227ZxeoRfoilUH7cgui28L5GuGo6bh6jHVVcCwZ7AWUdFUAKB4AR6Z4osIHlIINYEqvtGq2wLJezValNAPxDWHcHy0I0tc5Nxrnvb5gtJT9nQBH69RiNR9NIA/a8ZthjymimR1Finh7K1rZiiOdVMsdQNr2VCwUEfq2+E7bTpKoCgAKAAFGwAHIAeE41w3V0ZlS86wHo6sn+qdmE16q+SXgph+Jlt8AJReEE/S8ZWxzd5VbTQB5AMO6fIinoPxqvLPxHWNPBYhwbFcPVKnzCNaLOAEAwK6bC9SrfblpcoLj9VVipuWcKP+Eyq+0mlqy9vKth/rUVf9Us3Zt0Y+oFog43a+AqhtirUD5f11OxgQhtkVTVhKDfioUj80UxhFPC5/oWH/ALin8tItG0gAhCEAPCJzTjrhXs74nDr9nzq01+4fxqPw+I6c+XLpk11EBBBAIIIIIuCD0IgB89O010k1OB4kRvxRlX6NinpD3L6qd/wPuvy3X9mL8sX7VfjIZZFww3DilAbcxCWvB0x2a/CEAJJba8jOZro4nUsDOmo0cxyswvNOJbabGNpBxb7bTRIq3SF1fcxIWPa2HjHxSykmLcNQvUv5zVPRlVux0G7gm5MtL2Nphh6WtwByEueCwYCbiJ9TOo8UN9NG5cmIcDQ0giacxUx/XohREuM3NpxpqjuQdkPCUm0SNgKdqnrLJhcL3PSIW7lQ/GWhaaKT4yTHbtyjLD1gtHW3Le9uZ32t5xO9UaQ3l9ZJzWkxpoi6Sum7A9dIGn840xNIrnEuba3p9xnQK5enYuoq7hFcDY2YLsejdZa+GcOEwtIBFp9zUUTdVap3yAeu7GU96tlRG1VW1oFVlFKqp5jWU7jqOp+k6Fh6YVAo5AAD4AWH0kEs3XnjTy88eBAl4uzb9Fwj1AbOe5S/vH5HzsLt+zOE4eteuzeYHjylx9q2casUtBT3KKamAPOq4vv8E0/4zKJl3vA+JjmCPFL7F8ruy4Zen9PwzDrXof51nab/AEnJMgpBsZhv1wf8Cs/+mdZ8B85Xqvkv4Tg+LIWfYbtMJXp2uWoVFA8SyEAf88Yg9mq1xhWFemaX2gKhiCT9mmo2HIagTvvuZchyiLhimydtTb7tZiN77MSR9LRUYH0pftMxDrhUCI9RTWQvpBay0wXW4G9i6Jvy+cukS52Harh0XV7+pyptZVK3v5EFh6yARLyTD9nhaKWIKUaakHY3CAG/nGE8hAgICec5lAAnhns8gBQfajluqlTxCjdDof8AUf3Sfg237c5vgX01FPnO85tglr0alJuToy38CRsfQ2PpPn+orI9mFmViGHgwNiPnBlkdewOIHZr8IStYDMfsl36T2QSNsINIm5sVaaXUiLcVUIPWdWM1LucuUWtImYjFGL6mLF9z6CQa1Vj4zVTpsTNFOJlKEifXxdxpX1nmGU+vSaxS07kyZlVRXqAeEzlmSZrHC2iy8P4E7Eyzu4Ub7CaMIgSmCPCVjiPO9FwDOZny2+TOr0fSSyNRiMMxzVQbXEXnEKd7yk1sazNquZtXMGAtOdOfJnpI+l8YqmX/AA2aIFtcRVmCh3usqP6U17gkRvlWNJIDTSORukY5/TOEHJMcPcUwJvxbO1iCbaRCqlyPPp9I0oYcGiptuE+o/wB44tnAehHldLXWQEblu8fBV7x+e2/pLsYkySgO0d+oFvU2J/hHTGCIZ4DvMKtUKCzGyqCWPgALkz0GVX2jZj2OWViDZqgFJd7f1h0tb9jWfSWSt0Ubo4lm2YNXrVazXvUd2seYDG6r6LYek2ZctrGLCeQjfCi0fh3FpdjovA+GL4qm/SmrOT5lSgH75+RnSqW5JlQ9nWF04Rqh96q5Cn+yndH72uW5Rvbp1iueXKb+tG2KNRN6xdhNsTVH4lQ/K4jGL8NviKh8FUfnMTQZRZe+LP8AZoD5s+/+URkTF1H/AN05/wDrX6Mf5yAJ+qekzFpGxGMVXVL3dr2UEXAAJLEeGxkgSlmV5GFfymQDHyhQEieTWq2nuqQANOKcd5f2WYVAB3alqij9f3v3w87XqnP/AGm4G5oVhyUsjG34u8nps/zg+xaPcrmBpMKa93pCb6DrpG55QmPJjPFFqxhsIjfEAtYx/jVBBlQxqlWM6MXo5co7GaIpHKZBBflIGBxQNhGjDwlk6RVq2K8zewkXIHIreUY4mhqkTDAJVBlJStF4xo6W1a1C/lOYZ9idVQ78pdsVjh2HPpOcY17uT5zldTLdHrPRMOnIyptNwkSgZKWLI70keyfk1EtXRehYX/VG7fQGQQI/4Ypd9qn4QFHxY7/QfWa443JIS63L+PDJ/X+ssKLqZx1DG3qbxrg6n2e/MXvFTi1U22LKD6ySmJ7jDk19x4ToI8YxlltHSpPVm1fQAfwkpjvCmLC0xJklQc2E5N7ZMw3w9AHYa6rDz9xP4vOm5rUZaYK89Y9RvecC4+zE1swqk8k0IvkEXcf4i80xrZWXYRUt2Eb4ZulrnoPHyivCWuLy2cKYDtcbQXmocO36tMa9/IlQPWNJ8U2Lvbo7Vk+E7GjTpj/p00U+bAd4/O59ZPp+PjNY8OvWbLxF7GkZM20gYE/a1j/aQfuA/nFvF/D5xtJVWp2bI+tdVNaiO2krZ0bYizH+RmGQYarhqarWJqHSut6bPUAYC2wbv25Ac9h05SCSyMxkCi39Jb+6H+c/ymVTMqenZtR/CgLN8hvKvnnEwwYNR1TW9gql/wCrQEe8FBYsbkhQN9JuRewAoujDwlaxbdpmdNbbYbDvUfr36zFKXyVax9RGmR5g2Iw1Oq6NRd01FGBupuR13sbXHkRIOR4RhUxNaoCHrVmsG5ilTHZUh8Cql/8AuGSQNqVdfugt52kpHJ5i0g5ayimAOYJBv4g2P8JMDQYAbn4TJUmQYT28gAtEfF2D7bBVkAuwQuo/tp31t6rb1jomYONoAfP9LGmwhMMywwpV6lO3uVHUfAMQPpaeylI15M6hVfciIc1XYmEI2hJley8k1rDlL3Sw/cF57CS+4I016YAlfxy2YHwM8hKFifSZmpkX6RHicCw5/wARCE5ef5HrfSptY1RFoLY2kxTPYTBHbkZS8cPYYfoiXsC5Zj6mw+gEIRnp/kziesN/hX9GLYdWIJJuBbba81YtwDYAC5F9ufx8YQjrPNIfb9LTFTCECpAztu4PI3PoD/OfNGPxGuq7/jd2/wAbFvznsJtj7FJ+DVSexnUfZLhtdarVb7iIi79XJYn/APMfOEJpN+1ma+SOs0RzJmTmEIqbmio9p4KloQkgaHwVEtq7NAx5lRp1Hztz9ZklCmLAJTADXACLs3jy5784QkAStpix3hCAECgdNRx0DA+jD+YMaqLiEIMD0LMrz2EAPDMXM8hADlnFvDZqY2q4NgxQ2256Fv8AW88hCVLn/9k=',
//     name: 'Ali Mahmoud',
//     speciality: 'Pathology',
//     experience:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. At imperdiet dui accumsan sit amet nulla. Vivamus arcu felis bibendum ut tristique et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit.',
//   },
//   {
//     imageUrl:
//       'https://health.gov/sites/default/files/styles/600_wide/public/2022-06/cadqt.jpg?itok=zn27s5mX',
//     name: 'Alaa MAhmoud',
//     speciality: 'Dermatology',
//     experience:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. At imperdiet dui accumsan sit amet nulla. Vivamus arcu felis bibendum ut tristique et. Scelerisque varius morbi enim nunc faucibus a pellentesque sit.',
//   },
// ];

const DoctorsList = () => {
  const [loadedDoctors, setLoadedDoctors] = useState([]);

  const doctorDeletedHandler = deletedDoctorId => {
    setLoadedDoctors(prevDoctors =>
      prevDoctors.filter(doctor => doctor.id !== deletedDoctorId)
    );
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch('http://localhost:8000/doctors');
      const data = await response.json();
      // console.log(data.doctors);
      setLoadedDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const doctorsList = loadedDoctors.map(doctor => (
    <DoctorItem
      key={doctor._id}
      id={doctor._id}
      imageUrl={doctor.image}
      name={`${doctor.firstname} ${doctor.secondname}`}
      speciality={doctor.specialization}
      experience={doctor.experience}
      onDelete={doctorDeletedHandler}
    />
  ));

  if (doctorsList.length === 0) {
    return <h1>No Doctors found!</h1>;
  }

  return (
    <>
      <AppointmentForm />
      <ul className={classes.list}>{doctorsList}</ul>
    </>
  );
};

export default DoctorsList;
