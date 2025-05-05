using DEV.CNNNodeLIB;
using DevTests2.Common;

namespace DEV.CNNFilterLib
{
    public class DEV_CNNFilter
    {
        public DEV_CNNFilter
        (int kernelSize, int stride = 1, int padding = 0, Activation activation = Activation.ReLU)
        {
            Random rnd = new Random();
            KernelSize = kernelSize;
            Stride = stride;
            Padding = padding;
            Activation = activation;
            Bias = rnd.NextDouble() - .4;
        }
        double learning = 0.04;
        
        #region [Variables]
        #region [Private Variables]
        private int _TrainingSamples { get; set; }
        private int _NumberOfChannels { get; set; }
        private double _BiasGradient { get; set; }
        private bool _Ready { get; set; } = false;
        #endregion
        #region [Public Variables]
        public double[][] Activations { get; set; }
        public double[][] Derivatives { get; set; }
        public double[][] Gradient { get; set; }
        public double[][][] InputGradient { get; set; }
        #endregion
        #region [Training Variables]
        public DEV_CNNNode[] Channels { get; set; }    
        public double Bias { get; set; }
        #endregion
        #region [Kernel Variables]
        public int KernelSize { get; set; }    
        public int Stride { get; set; }
        public int Padding { get; set; }
        #endregion
        #region [Shared Variables]
        public Activation Activation { get; set; }   
        #endregion
        #endregion
        #region [Private Methods]
        private double[][][] _SplitChannelData
        (double[][][] samples)
        {
            double[][][] channelSplitted = new double[_NumberOfChannels][][];
            for(int channel = 0; channel < _NumberOfChannels; channel++)
            {
                double[][] sampleChannelData = new double[_TrainingSamples][];
                for(int sample = 0; sample < _TrainingSamples; sample++)
                    sampleChannelData[sample] = samples[sample][channel];
                channelSplitted[channel] = sampleChannelData;
            }
            return channelSplitted;
        }
        private (double[] activations, double[] derivatives) _ActivateChannelCalculations
        (double[][] channelCalculations)
        {
            int _features = channelCalculations[0].Length;
            double[] acts = new double [_features];
            double[] ders = new double [_features];
            for(int feature = 0; feature < _features; feature++)
            {
                double[] featuresCollection = new double[_NumberOfChannels];
                for(int channel = 0; channel < _NumberOfChannels; channel++)
                    featuresCollection[channel] = channelCalculations[channel][feature];

                double prediction = featuresCollection.Sum() + Bias;
                switch(Activation)
                {
                    case Activation.ReLU:
                        acts[feature] = prediction <= 0 ? 0 : prediction;
                        ders[feature] = prediction <= 0 ? 0 : 1;
                        break;
                    case Activation.Tanh:
                        acts[feature] = Math.Tanh(prediction);
                        ders[feature] = 1 - Math.Pow(acts[feature], 2); 
                        break;
                    case Activation.Sigmoid:
                        acts[feature] = 1 / (1 + Math.Exp(-prediction));
                        ders[feature] = acts[feature] * (1 - acts[feature]);
                        break;
                }
            }
            return (acts, ders);
        }
        private void _GetReady
        (double[][][] samples)
        {
            _NumberOfChannels = samples[0].Length;
            Channels = new DEV_CNNNode[_NumberOfChannels];
            for(int channel = 0; channel < _NumberOfChannels; channel++)
                Channels[channel] = new DEV_CNNNode(KernelSize, Stride, Padding, Activation.SimpleConvolution);
            _Ready = true;
        }
        private void _UpdateFilterActivations
        (double[][][] channelsActivationsCollection)
        {
            Activations = new double[_TrainingSamples][];
            Derivatives = new double[_TrainingSamples][];
            for(int sample = 0; sample < _TrainingSamples; sample++)
            {
                double[][] channelSampleCollection = new double[_NumberOfChannels][];
                for(int channel = 0; channel < _NumberOfChannels; channel++)
                    channelSampleCollection[channel] = channelsActivationsCollection[channel][sample];

                (double[] activations, double[] derivatives) calc = _ActivateChannelCalculations(channelSampleCollection);
                Activations[sample] = calc.activations;
                Derivatives[sample] = calc.derivatives;
            }
        }
        #endregion
        #region [Public Methods]
        public void Train
        (double[][][] samples)
        {
            _TrainingSamples = samples.Length;
            if(!_Ready) _GetReady(samples);

            double[][][] channelSplittedData = _SplitChannelData(samples);

            double[][][] channelsActivationsCollection = new double[_NumberOfChannels][][];
            for(int channel = 0; channel < _NumberOfChannels; channel++)
            {
                Channels[channel].Train(channelSplittedData[channel]);
                channelsActivationsCollection[channel] = Channels[channel].Activations;
            }
            _UpdateFilterActivations(channelsActivationsCollection);
        }
        public void UpdateGradient
        (double[][] previousInputGradient)
        {
            int _features = previousInputGradient[0].Length;
            Gradient = new double[_TrainingSamples][];
            InputGradient = new double[_NumberOfChannels][][];

            for(int sample = 0; sample < _TrainingSamples; sample++)
            {
                double[] gradient = new double[_features];
                double[] inpGrad = previousInputGradient[sample];
                double[] curDeriv = Derivatives[sample];
                for(int feature = 0; feature < _features; feature++)
                    gradient[feature] = curDeriv[feature] * inpGrad[feature];
                Gradient[sample] = gradient;
                _BiasGradient += Gradient[sample].Sum();
            }

            _BiasGradient /= _TrainingSamples;

            for(int channel = 0; channel < _NumberOfChannels; channel++)
            {
                Channels[channel].Gradient = Gradient;
                Channels[channel].UpdateGradient();
                InputGradient[channel] = Channels[channel].InputGradient;
            }

            Propagate();
        }
        public void Propagate()
        {
            Bias -= learning * _BiasGradient;
        }
        public double[] Evaluate
        (double[][] sample)
        {
            double[][] channelCalculationsCollection = new double[_NumberOfChannels][];
            for(int channel = 0; channel < _NumberOfChannels; channel++)
                channelCalculationsCollection[channel] = Channels[channel].Evaluate(sample[channel]);
            return _ActivateChannelCalculations(channelCalculationsCollection).activations;
        }
        #endregion
    }
}
