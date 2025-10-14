namespace HillarysHairCare.Models.DTOs;

public class CreateAppointmentDTO
{
  public int CustomerId { get; set; }
  public int StylistId { get; set; }
  public DateTime StartTime { get; set; }
  public List<int> ServiceIds { get; set; }
}
