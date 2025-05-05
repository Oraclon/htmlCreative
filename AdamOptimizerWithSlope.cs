using System;

class AdamLinearExample
{
    static void Main()
    {
        // Single training sample
        double inputX = 2.0;
        double targetY = 10.0;

        // Model parameters (weights and bias)
        double w = 1.0; // initial slope
        double b = 0.0; // initial bias

        // Adam hyperparameters
        double alpha = 0.1;    // learning rate
        double beta1 = 0.9;
        double beta2 = 0.999;
        double epsilon = 1e-8;

        // Moment estimates for w and b
        double mw = 0.0, vw = 0.0;
        double mb = 0.0, vb = 0.0;

        // Bias correction
        double beta1_t = beta1;
        double beta2_t = beta2;

        // Forward pass
        double y_pred = w * inputX + b;
        double loss = Math.Pow(y_pred - targetY, 2);

        // Gradients (from MSE loss)
        double grad_y = 2 * (y_pred - targetY);      // dL/dy_pred
        double grad_w = grad_y * inputX;             // dL/dw
        double grad_b = grad_y;                      // dL/db

        // Update moments for w
        mw = beta1 * mw + (1 - beta1) * grad_w;
        vw = beta2 * vw + (1 - beta2) * grad_w * grad_w;
        double mwHat = mw / (1 - beta1_t);
        double vwHat = vw / (1 - beta2_t);
        w -= alpha * mwHat / (Math.Sqrt(vwHat) + epsilon);

        // Update moments for b
        mb = beta1 * mb + (1 - beta1) * grad_b;
        vb = beta2 * vb + (1 - beta2) * grad_b * grad_b;
        double mbHat = mb / (1 - beta1_t);
        double vbHat = vb / (1 - beta2_t);
        b -= alpha * mbHat / (Math.Sqrt(vbHat) + epsilon);

        // Output results
        Console.WriteLine($"Updated w: {w}");
        Console.WriteLine($"Updated b: {b}");
        Console.WriteLine($"Loss: {loss}");
    }
}
