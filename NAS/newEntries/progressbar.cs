using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace ProgressBarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private static int _progress = 0;

        // Simulate a long-running task
        [HttpGet("start")]
        public async Task<IActionResult> StartLongRunningTask(CancellationToken cancellationToken)
        {
            // Start a background task that updates progress
            await Task.Run(async () =>
            {
                while (_progress < 100)
                {
                    if (cancellationToken.IsCancellationRequested)
                    {
                        break;
                    }

                    // Simulate some work
                    await Task.Delay(500);
                    _progress += 10; // Increase progress by 10%
                }
            });

            return Ok("Task Completed!");
        }

        // Endpoint to get current progress
        [HttpGet("progress")]
        public IActionResult GetProgress()
        {
            return Ok(new { Progress = _progress });
        }

        // Reset progress
        [HttpGet("reset")]
        public IActionResult ResetProgress()
        {
            _progress = 0;
            return Ok("Progress reset.");
        }
    }
}
