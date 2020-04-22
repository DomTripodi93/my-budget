using AutoMapper;
using backend.Dtos;
using backend.Models;

namespace backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForReturnDto>();
            CreateMap<TransactionForCreationDto, Transaction>().ReverseMap();
            CreateMap<TransactionForUpdateDto, Transaction>().ReverseMap();
            CreateMap<Transaction, TransactionForReturnDto>();
        }
    }
}
