using System;
using System.Collections.Generic;
using System.Text;
using Application.DTOs;
using Domain.Interfaces;
using Domain.Entities;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.ValueObjects;
using Application.Exceptions;


namespace Application.Services.Subscription
{
    public class SubscriptionService(ISubscriptionRepository _repository) : ISubsciptionService
    {

        public async Task<IEnumerable<SubscriptionDto>> GetAllAsync()
        {
            var subscriptions = await _repository.GetAllAsync();
            return subscriptions.Select(SubscriptionDto.From);
        }

        public async Task<SubscriptionDto> GetByIdAsync(int id)
        {
            var subscription = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException(nameof(Subscription), id);

            return SubscriptionDto.From(subscription);
        }

        public async Task<IEnumerable<SubscriptionDto>> GetByUserEmailAsync(string email)
        {
            var subscriptions = await _repository.GetByUserEmailAsync(email);
            return subscriptions.Select(SubscriptionDto.From);
        }

        public async Task<SubscriptionDto> CreateAsync(CreateSubscriptionDto dto)
        {
            var email = new Email(dto.UserMail);
            var subscription = new Domain.Entities.Subscription(dto.Type, email, dto.Price);

            await _repository.AddAsync(subscription);
            return SubscriptionDto.From(subscription);
        }

        public async Task<SubscriptionDto> UpdateAsync(int id, UpdateSubscriptionDto dto)
        {
            var subscription = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException(nameof(Subscription), id);

            subscription.UpdatePrice(dto.Price);

            await _repository.UpdateAsync(subscription);
            return SubscriptionDto.From(subscription);
        }

        public async Task CancelAsync(int id)
        {
            var subscription = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException(nameof(Subscription), id);

            subscription.Cancel();

            await _repository.UpdateAsync(subscription);
        }

        public async Task DeleteAsync(int id)
        {
            var subscription = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException(nameof(Subscription), id);

            await _repository.DeleteAsync(subscription.Id);
        }
    }
}
