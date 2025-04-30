using DevTests2.Common;
using CNN.FilterLIB;

namespace CNN.LayerLIB
{
    /// <summary>
    /// Variables:<br/>
    /// <strong>NumberOfKernels</strong>: User Defined <br/>
    /// <strong>KernelSize</strong>: User Defined <br/>
    /// <strong>Stride</strong>: User Defined (Default: 1)<br/>
    /// <strong>Padding</strong>: User Defined (Default: 0)<br/>
    /// <strong>Activation</strong>: User Defined (Default: ReLU)<br/>
    /// <strong>NumberOfChannels</strong> : Random Generated
    /// </summary>
    public class CNNLayer
    {
        #region [Constructor and Variables]
        public CNNLayer
        (int numberOfKernels, int kernelSize, int stride = 1, int padding = 0, Activation activation = Activation.ReLU)
        {
            NumberOfKernels = numberOfKernels;
            KernelSize = kernelSize;
            Stride = stride;
            Padding = padding;
            Activation = activation;

            Kernels = new CNNFilter[NumberOfKernels];
            for(int kernel = 0; kernel < NumberOfKernels; kernel++)
                Kernels[kernel] = new CNNFilter(kernelSize, Stride, Padding, Activation);
        }
        public int NumberOfKernels      { get; set; }
        public int NumberOfChannels     { get; set; }
        public int KernelSize           { get; set; }
        public int Stride               { get; set; }
        public int Padding              { get; set; }
        public Activation Activation    { get; set; }
        public double[][][] Activations { get; set; }
        public CNNFilter[] Kernels { get; set; }
        #endregion

        public void Train(double[][] inputs)
        {
            for(int kernel = 0; kernel < NumberOfKernels; kernel++)
            {
                Kernels[kernel].Train(inputs);
            }
            
        }
        public void Train(double[][][] inputs)
        {
            for(int kernel = 0; kernel < NumberOfKernels; kernel++)
                Kernels[kernel].Train(inputs);

            double[][][] activations = new double[inputs.Length][][];
            for(int sample = 0; sample < inputs.Length; sample++)
            {
                double[][] collection = new double[NumberOfKernels][];
                for(int kernel = 0; kernel < NumberOfKernels; kernel++)
                    collection[kernel] = Kernels[kernel].Activations[sample];
                activations[sample] = collection; 
            }
            Activations = activations;
        }
    }

}
