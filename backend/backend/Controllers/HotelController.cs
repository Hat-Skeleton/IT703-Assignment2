using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Security.AccessControl;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private IConfiguration _configuration;

        public HotelController(IConfiguration config)
        {
            _configuration = config;
        }

        [HttpGet]
        [Route("GetCustomers")]
        public JsonResult GetCustomers()
        {
            string query = "select * from Customers";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("hotelDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        
        [HttpGet]
        [Route("GetBookings")]
        public JsonResult GetBookings()
        {
            string query = "select * from Bookings";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("hotelDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPut]
        [Route("UpdateBookings")]
        public JsonResult UpdateBookings([FromQuery] int status, [FromQuery] int id)
        {
            // Your existing code
            try
            {
                string query = "UPDATE Bookings SET CheckStatus = @status WHERE BookingId = @id;";
                DataTable table = new DataTable();
                string sqlDatasource = _configuration.GetConnectionString("hotelDBCon");
                SqlDataReader myReader;

                using (SqlConnection myCon = new SqlConnection(sqlDatasource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@status", status);
                        myCommand.Parameters.AddWithValue("@id", id);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }

                if (status == 1)
                {
                    return new JsonResult("Checked In");
                }
                else
                {
                    return new JsonResult("Checked Out");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult($"Error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetUsers")]
        public JsonResult GetUsers()
        {
            string query = "select * from Users";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("hotelDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet]
        [Route("GetUser/{id}")]
        public JsonResult GetUser(int id)
        {
            string query = "SELECT * FROM Users WHERE UserId = @id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("hotelDBCon");

            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    SqlDataReader myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }

            return new JsonResult(table);
        }



        [HttpPost]
        [Route("CreateUser")]
        public JsonResult CreateUser([FromForm] UserCreateModel model)
        {
            string query = "INSERT INTO Users (Username, Password, UserType) VALUES (@username, @password, 'Reception')";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("hotelDBCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@username", model.Username);
                    myCommand.Parameters.AddWithValue("@password", model.Password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        public class UserCreateModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpPut]
        [Route("UpdateUser")]
        public JsonResult UpdateUser([FromBody] UpdateUserModel model)
        {
            try
            {
                string query = "UPDATE Users SET UserType = @type WHERE UserId = @id";
                DataTable table = new DataTable();
                string sqlDatasource = _configuration.GetConnectionString("hotelDBCon");

                using (SqlConnection myCon = new SqlConnection(sqlDatasource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@type", model.Type);
                        myCommand.Parameters.AddWithValue("@id", model.Id);
                        myCommand.ExecuteNonQuery();
                    }
                }

                return new JsonResult("User type updated successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult($"Error: {ex.Message}");
            }
        }

        public class UpdateUserModel
        {
            public int Id { get; set; }
            public string Type { get; set; }
        }



    }
}
