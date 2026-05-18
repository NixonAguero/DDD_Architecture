using System;
using System.Collections.Generic;
using System.Text;
using Application.DTOs;
using System.Threading.Tasks;


namespace Application.Interfaces
{
    public interface ISubsciptionService
    {
        Task<IEnumerable<SubscriptionDto>> GetAllAsync();
        Task<SubscriptionDto> GetByIdAsync(int id);
        Task<IEnumerable<SubscriptionDto>> GetByUserEmailAsync(string email);
        Task<SubscriptionDto> CreateAsync(CreateSubscriptionDto dto);
        Task<SubscriptionDto> UpdateAsync(int id, UpdateSubscriptionDto dto);
        Task CancelAsync(int id);
        Task DeleteAsync(int id);
    }
}
