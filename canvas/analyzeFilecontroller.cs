using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;
using System;
using System.IO;

public class HomeController : Controller
{
    [HttpPost]
    public IActionResult UploadCanvasImage([FromBody] CanvasImageModel model)
    {
        if (string.IsNullOrWhiteSpace(model?.ImageBase64))
            return BadRequest("Image data is empty.");

        try
        {
            // Strip the data URI prefix
            var base64Data = model.ImageBase64.Split(',')[1];
            byte[] imageBytes = Convert.FromBase64String(base64Data);

            using var image = Image.Load(imageBytes); // Load using ImageSharp

            // (Optional) Process the image — resize, watermark, etc.
            image.Mutate(x => x.Resize(image.Width / 2, image.Height / 2));

            // Save to disk (in wwwroot/uploads)
            string uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            Directory.CreateDirectory(uploadsPath); // Make sure folder exists
            string filePath = Path.Combine(uploadsPath, "canvas_image.png");

            image.Save(filePath, new PngEncoder()); // Save as PNG with ImageSharp

            return Ok("Image received, processed, and saved.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error processing image: {ex.Message}");
        }
    }
}

public class CanvasImageModel
{
    public string ImageBase64 { get; set; }
}
