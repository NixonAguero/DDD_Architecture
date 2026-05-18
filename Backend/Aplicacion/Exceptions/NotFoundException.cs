using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Exceptions
{
    public class NotFoundException
    {
        public NotFoundException(string entity, object key)
            : base($"{entity} with id '{key}' was not found.") { }

    }
}
