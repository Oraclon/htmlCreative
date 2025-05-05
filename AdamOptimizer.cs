using System;

class AdamOptimizer
{
    static void Main()
    {
        // Objective function: f(x) = x^2, so gradient df/dx = 2x
        double x = 5.0; // initial value of parameter

        // Adam hyperparameters
        double alpha = 0.1;     // learning rate
        double beta1 = 0.9;
        double beta2 = 0.999;
        double epsilon = 1e-8;

        // Moment estimates
        double m = 0.0; // first moment
        double v = 0.0; // second moment

        // Bias correction terms
        double beta1_t = beta1;
        double beta2_t = beta2;

        // Gradient at current x
        double grad = 2 * x;

        // Update biased first and second moment estimates
        m = beta1 * m + (1 - beta1) * grad;
        v = beta2 * v + (1 - beta2) * grad * grad;

        // Bias-corrected estimates
        double mHat = m / (1 - beta1_t);
        double vHat = v / (1 - beta2_t);

        // Update parameter
        x -= alpha * mHat / (Math.Sqrt(vHat) + epsilon);

        Console.WriteLine($"Updated x: {x}");
    }
}
