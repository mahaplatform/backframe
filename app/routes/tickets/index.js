import resources from 'app/middleware/resources'
import Ticket from 'app/models/ticket'
import TicketSerializer from 'app/serializers/ticket_serializer'

export default resources({
  name: 'ticket',
  model: Ticket,
  serializer: TicketSerializer,
  ownedByUser: true,
  allowedParams: ['text']
})
