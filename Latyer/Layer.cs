using DEV.CNNFilterLib;
using DevTests2.Common;

namespace DEV_CNNLayerLib
{
    public class DEV_CNNLayer
    {
        public DEV_CNNLayer
        (int numberOfFilters, int kernelSize, int stride = 1, int padding = 0, Activation activation = Activation.ReLU)
        {
            _NumberOfFilters = numberOfFilters;
            KernelSize = kernelSize;
            Stride = stride;
            Padding = padding;
            Activation = activation;

            Filters = new DEV_CNNFilter[_NumberOfFilters];
            for(int filter = 0; filter < _NumberOfFilters; filter++)
                Filters[filter] = new DEV_CNNFilter(KernelSize, Stride, Padding, Activation);
        }
        
        #region [Variables]
        #region [Info Variables]
        public int Stride { get; set; }
        public int Padding { get; set; }
        public int KernelSize { get; set; }
        public Activation Activation { get; set; }
        #endregion
        #region [Private Variables]
        private int _TrainingSamples { get; set; }
        private int _NumberOfFilters { get; set; }
        #endregion
        #region [Public Variables]
        public double[][][] Activations { get; set; }
        public double[][][] InputGradient { get; set; }
        public DEV_CNNFilter[] Filters { get; set; }
        #endregion
        #endregion
        #region [Private Methods]
        private void _UpdateLayerActivations
        (double[][][] filterActivations)
        {
            Activations = new double[_TrainingSamples][][];
            for(int sample = 0; sample < _TrainingSamples; sample++)
            {
                double[][] filterActivationsOfSamples = new double[_NumberOfFilters][];
                for(int filter = 0; filter < _NumberOfFilters; filter++)
                    filterActivationsOfSamples[filter] = filterActivations[filter][sample];
                Activations[sample] = filterActivationsOfSamples;
            }
        }
        #endregion
        #region [Public Methods]
        public void Train(double[][][] samples)
        {
            _TrainingSamples = samples.Length;
            double[][][] filterActivations = new double[_NumberOfFilters][][];
            for(int filter = 0; filter < _NumberOfFilters; filter++)
            {
                Filters[filter].Train(samples);
                filterActivations[filter] = Filters[filter].Activations;
            }
            _UpdateLayerActivations(filterActivations);
        }
        #endregion
    }
}
