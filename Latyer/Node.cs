using DevTests2.Common;
using DevTests2.Datastructure;
using DevTests2.src.System.Datastructure;

namespace DEV.CNNNodeLIB
{
    public class DEV_CNNNode
    {
        public DEV_CNNNode
        (int kernelSize, int stride = 1, int padding = 0, Activation activation = Activation.ReLU)
        {
            Stride = stride;
            Padding = padding;
            Activation = activation;
            _KernelSize = kernelSize;
        }
        double learning = .04;
        
        #region [Variables]
        #region [Memory Variables]
        private int _samplesMemory { get; set; }
        private int _kernelMemory { get; set; }
        #endregion
        #region [Private Variables]
        private int _TrainingSamples { get { return _samplesMemory; } set {
            _samplesMemory = value;
            Activations = new double[_samplesMemory][];
            Derivatives = new double[_samplesMemory][];
            Gradient = new double[_samplesMemory][];
            MultipliedWith = new double[_samplesMemory][][];
        } }
        private int _KernelSize { get { return _kernelMemory; } set{
            Kernel = new Datastructure<double>();
            Kernel.BuildKernel(value);
            _kernelMemory = (int)Math.Pow(value,2 );
        } }
        #endregion
        #region [Public Variables]
        public double[][] Activations { get; set; }
        public double[][] Derivatives { get; set; }
        public double[][] Gradient { get; set; }
        public double[] KernelGradient { get; set;}
        public double[] KernelGradientPow { get; set; }
        public double[][] InputGradient { get; set; }
        public double[][][] MultipliedWith { get; set; }
        #endregion
        #region [Train Variables]
        public Datastructure<double> Kernel { get; set; }
        public double Bias { get; set;}
        #endregion
        #region [Kernel Variables]
        public int Stride { get; set; }
        public int Padding { get; set; }
        #endregion
        #region [Shared Variables]
        //private MLModel _Model { get; set; }
        public Activation Activation { get; set; }
        #endregion
        #endregion
        #region [Private Methods]
        public (double[] activations, double[] derivatives) _ActivateConvolution
        (ConvDatastructure cdts)
        {
            int _features = cdts.dataSize;
            double[] acts = new double[_features];
            double[] ders = new double[_features];

            for(int feature = 0; feature < _features; feature++)
            {
                double prediction = cdts.calcsSummed[feature] + Kernel.bias;
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
        #endregion
        #region [Public Methods]
        public void Train
        (double[][] samples)
        {
            _TrainingSamples = samples.Length;
            for(int sample = 0; sample < _TrainingSamples; sample++)
            {
                ConvDatastructure cdts = new ConvDatastructure(Padding, Stride);
                cdts.InsertArrayOnDataItemsArr(samples[sample]);
                cdts.ApplyKernelOnSample(Kernel);
                if(Activation == Activation.SimpleConvolution)
                    Activations[sample] = cdts.calcsSummed;
                else
                {
                    (double[] activations, double[] derivatives) pred = _ActivateConvolution(cdts);
                    Activations[sample] = pred.activations;
                    Derivatives[sample] = pred.derivatives;
                }
                MultipliedWith[sample] = cdts.multipliedWith;
            }
        }
        public void UpdateGradient()
        {
            double[] kernelGradient = new double[_KernelSize];
            double[] kernelGradientPow = new double[_KernelSize];
            //Se auth th periptwsh upologizoume kateutheian to KernelGradient kai to InputGradient
            //To Gradient ginetai assign apo to CNNFilter
            for(int sample = 0; sample < _TrainingSamples; sample++)
            {
                double[][] multipliedWith = MultipliedWith[sample];

                //Twra kanoume loopa anamesa sta kernelFeatures px 3sx3 => 0-9
                //Kai apo ta multipliedWith sullegoume to value you antistoixou feature.
                for(int kernelFeature = 0; kernelFeature < _KernelSize; kernelFeature++)
                {
                    double[] multipliedFeatures = multipliedWith.Select(x=> x[kernelFeature]).ToArray();
                    double[] selectedGradient = Gradient[sample];
                    int _features = selectedGradient.Length;
                    
                    //Twra pollaplasiazoume to kathe enas stoixeio tou [multipliedFeatures] me to antistoixo feature
                    //tou antistoixou [selectedGradient]
                    double result = 0;
                    double resultPow = 0;
                    for(int feature = 0; feature < _features; feature++){
                        result += multipliedFeatures[feature] * selectedGradient[feature];
                        resultPow += Math.Pow(multipliedFeatures[feature] * selectedGradient[feature], 2);
                    }
                    
                    //Meta apo ton ypologismo tou kathe feature tote prosthetoume to result
                    //sthn antistoixh thesh tou karnelGradient.
                    kernelGradient[kernelFeature] += result / _TrainingSamples;
                    kernelGradientPow[kernelFeature] += resultPow;
                }
            }
            KernelGradient = kernelGradient;
            KernelGradientPow = kernelGradientPow;
        }
        public void Propagate()
        {
            for(int kernelFeature = 0; kernelFeature < _KernelSize; kernelFeature++)
                Kernel.dataItemsArr[kernelFeature] -= learning * KernelGradient[kernelFeature];
        }
        public double[] Evaluate(double[] sample)
        {
            ConvDatastructure cdts = new ConvDatastructure(Padding, Stride);
            cdts.InsertArrayOnDataItemsArr(sample);
            cdts.ApplyKernelOnSample(Kernel);
            return Activation == Activation.SimpleConvolution 
            ? cdts.calcsSummed 
            : _ActivateConvolution(cdts).activations;
        }
        #endregion
    }
}
