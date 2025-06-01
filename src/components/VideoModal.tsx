
interface VideoModalProps {
  isVisible: boolean;
  videoUrl: string;
  tip: string;
  onClose: () => void;
}

const VideoModal = ({ isVisible, videoUrl, tip, onClose }: VideoModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 max-w-2xl mx-4 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">🎓 Momento Educativo!</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full rounded-xl"
            style={{ maxHeight: '300px' }}
          >
            Seu navegador não suporta vídeos.
          </video>
        </div>
        
        <div className="bg-gradient-to-r from-kidBlue to-kidPurple text-white p-4 rounded-xl mb-4">
          <p className="text-lg text-center">{tip}</p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-kidGreen text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
          >
            Continuar Jogando
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
