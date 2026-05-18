using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTOs
{
    public record CreateSubscriptionDto(
        string Type,
        string UserMail,
        decimal Price);
}
